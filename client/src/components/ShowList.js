import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Show from '../components/Show';
import './ShowList.css';

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
                     <Link to={`/shows/${course.id}`}>{course.coursename}</Link>
                  </li>
               );
            });
      } else {
         li =
            this.state.data &&
            this.state.data.map(course => (
               <li key={course.id}>
                  <Link className="showlink" to={`/shows/${course.id}`}>{course.coursename}</Link>
               </li>
            ));
      }
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
            </form>
            <ul className="list-unstyled">{li}</ul>

         </div>

      );

      return body;
   }

}

export default ShowList;
