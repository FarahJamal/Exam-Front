import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import CardColumns from 'react-bootstrap/CardColumns'
import { withAuth0 } from '@auth0/auth0-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlowersArr: [],
      addArr:[],
      show:false

    }

  }

  getData = async () => {
    axios
      .get(`http://localhost:3001/getAll`)
      .then(results => {
        this.setState({
          FlowersArr: results.data,
        })
      })
  }
addToFav=(item)=>{
  const URLS=`http://localhost:3001/addFav`
  const name=item.name;
  const instructions=item.instructions;
  const photo=item.photo;
  const {user}=this.props.auth0;

  const Data={
    email:user.email,
    name:name,
    instructions:instructions,
    photo:photo
  }

  axios
  .post(URLS,Data)
  .then(e=>{
    
      this.setState({
        addArr:e.data,
        show:true

      })
    
  })
  .catch(err=>{
    console.log(err);
  })

}
  componentDidMount(){
    this.getData()
  }
  render() {
    return (
      <center>
      <CardColumns>


    { this.state.FlowersArr.map((e)=>{
      return(
      <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={e.photo} />
          <Card.Body>
            <Card.Title>{e.name}</Card.Title>
            <Card.Text>
             {e.instructions}
            </Card.Text>
            <Button variant="danger" onClick={()=> this.addToFav(e)}>Love</Button>
          </Card.Body>
        </Card> 
      )
        }) }
        </CardColumns>
      </center>
    )
  }
}

export default withAuth0(Home);
