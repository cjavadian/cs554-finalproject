import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Show from '../components/Show';
import './ShowList.css';
import {GET_ALL_COURSES} from "../queries/queries"
import { Query } from 'react-apollo';


class ShowList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false,
         searchTerm: undefined,
         searchData: undefined
      };
   }
   async getShows() {
      try {
         //  const response = await axios.get('http://api.tvmaze.com/shows');
         const response = [
            {
               id: "111111",
               courseId: "CS-554",
               coursename: "Web-2"
            },
            {
               id: "111112",
               courseId: "CS-546",
               coursename: "Web Programming"
            }
         ];
         // console.log(response[0].coursename)
         // response.map(course=>{
         this.setState({ data: response, searchData: response });
         //})

      } catch (e) {
         console.log(e);
      }
   }
   componentDidMount() {
      this.getShows();
   }

   handleChange = (e) => {
      let value = e.target.value;
      this.setState({ searchTerm: value }, () => {
         this.searchShows();
      });
   }

   onSubmit(e) {
      e.preventDefault();
   }
   async searchShows() {
      const { searchTerm, data } = this.state
      if (searchTerm) {
         try {
            // const response = await axios.get('http://api.tvmaze.com/search/shows?q=' + this.state.searchTerm);
            // filter our data
            console.log("our data:", data)
            const filteredCourse = data.filter(c => {
               if (c.coursename) {
                  return c.coursename.indexOf(searchTerm) !== -1
               }
            })
            this.setState({ searchData: filteredCourse });
         } catch (e) {
            console.log(e);
         }
      }
   }
   render() {
      
      let body = null;
      let li = null;
      const { searchData, searchTerm } = this.state

      if (searchTerm) {
         li =
            searchData && searchData.map(course => {
               return (
                  <li key={course.id}>
                     <Link to={`/course/${course.id}`}>{course.coursename}</Link>
                  </li>
               );
            });
      } 

         li = 
      <Query query={GET_ALL_COURSES}>
					{({ data }) => {
						console.log(`showlist data: ${JSON.stringify(data)}`);
                  const {courses} = data;
						if(!courses) {
							return null;
                  }
						return (
							<div>
								{courses.map((course) => {
                           console.log(course._id);
									return (
                                 <li key={course._id}>
                                    <Link className="showlink" to={`/course/${course._id}`}>{course.title}</Link>
                                 </li>
									);
								})}
							</div>
						);
					}}
				</Query>
      
      body = (
         <div className="container">
            <form className="my-form" method="POST " name="formName" onSubmit={this.onSubmit}>
               
               <label name="searchlabel">
                  {' '}
                  Search Term:
                 <input
                     type="text"
                     name="searchTerm"
                     onChange={this.handleChange}
                  />
               </label>
               <button type="submit">Submit</button>
            </form>
            <ul className="list-unstyled">{li}</ul>
         </div>

      );

      return body;
   }

}

export default ShowList;
