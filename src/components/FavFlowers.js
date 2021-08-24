import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import CardColumns from 'react-bootstrap/CardColumns'
import { withAuth0 } from '@auth0/auth0-react';
import UpdateModal from './UpdateModal'
class FavFlowers extends React.Component {
  constructor(props){
    super(props);
    this.state={
      FlowersArr:[],
      show:false,
      index:-1
    }
  }

  getFav=()=>{
    const {user}= this.props.auth0;
    const URL=`http://localhost:3001/getFav?email=${user.email}`
    axios
    .get(URL)
    .then(results=>{
      this.setState({
        FlowersArr:results.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
  deleteFav=(index)=>{
    const {user}= this.props.auth0;
    const Data={
      email:user.email
    }
    axios.delete(`http://localhost:3001/deleteFav/${index}`,{params:Data})
    .then(data=>{
      this.setState({
        FlowersArr:data.data.Chars
      })
    })
.catch(err=>{
  console.log(err);
})
  }

handleClose=()=>{
  this.setState({
    show:false
  })
}
  showModal=(i)=>{
this.setState({
  index:i,
  show:true,
  name:this.state.FlowersArr[i].name,
  instructions:this.state.FlowersArr[i].instructions,
  photo:this.state.FlowersArr[i].photo,

})

  }

  updateChar=(event)=>{
    const {user}= this.props.auth0;

    event.preventDefault();
    const newData={
name:event.target.name.value,
instructions:event.target.instructions.value,
photo:event.target.photo.value,
email:user.email
    }

    axios.
    put(`http://localhost:3001/update/${this.state.index}`,newData)
    .then(results=>{
      this.setState({
        FlowersArr:results.data.Chars

      })
    })
  }
componentDidMount=()=>{
  this.getFav();
}
  render() {
   
    return(
      <center>
      <CardColumns>


    { this.state.FlowersArr.map((e,idx)=>{
      return(
        <div key={idx}>
      <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={e.photo} />
          <Card.Body>
            <Card.Title>{e.name}</Card.Title>
            <Card.Text>
             {e.instructions}
            </Card.Text>
            <Button variant="danger" onClick={()=> this.deleteFav(idx)}>delete</Button>
            <Button variant="danger" onClick={()=> this.showModal(idx)}>update</Button>

          </Card.Body>
        </Card> 
        </div>
      )
        }) }
        </CardColumns>
        <UpdateModal>
        show={this.state.show}
        close={this.state.handleClose}
        update={this.updateChar}
        name={this.state.name}
        photo={this.state.photo}
        instructions={this.state.instructions}
        </UpdateModal>
      </center>

     
    )

   

  }
}

export default withAuth0(FavFlowers);
