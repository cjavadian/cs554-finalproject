import {gql} from "apollo-boost";

const addUserMutation = gql`
    mutation($first_name:String!, $last_name:String!, $user_name:String!, $email:String!){
        addUser(first_name: $first_name, last_name: $last_name, user_name: $user_name, email:$email){
        	_id
        }
    }
`

export{
	addUserMutation
}

