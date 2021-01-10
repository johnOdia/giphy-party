import { Component } from 'react';
import { Giphy } from './giphy';

export class Giphyform extends Component {
    constructor(props) {
        super(props);
        this.state = {giphy:[], gif:{}};

        this.addNewGiphyToState = this.addNewGiphyToState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    componentDidMount () {        
      fetch(`https://api.giphy.com/v1/gifs/trending?api_key=g2h6Z5t4F9SvyI2ZY1BxzYEAPCxqDL3Y&limit=25&rating=g`,this.requestOptions)
        .then(response => response.json())
        .then(result => {               
            const giphy = {
                url: result.data[0].embed_url,
                alt: result.data[0].title
            };  
            this.setState({gif: giphy}) 
        })
        
        
        console.log(this.state);
        
    }

    requestGiphyFromAPI(giphy) {   
        console.log(arguments)   

        fetch(`https://api.giphy.com/v1/gifs/search?api_key=g2h6Z5t4F9SvyI2ZY1BxzYEAPCxqDL3Y&q=${giphy}&limit=25&offset=0&rating=g&lang=en`, this.requestOptions)
            .then(response => response.json())
            .then(result => {               
                const giphy = {
                    url: result.data[0].embed_url,
                    alt: result.data[0].title
                };                

                this.addNewGiphyToState(giphy);
            })
            .catch(error => {
                console.log(error.message);                
                alert('An error ocurred!');
            })
    }

    addNewGiphyToState(giphy){        
       const giphys = this.state.giphy;
       giphys.push(giphy);
       
       this.setState({giphy: giphys});       
    }

    handleSubmit(e){
        e.preventDefault()        
        const giphy = e.target.parentNode.children[0];
        this.requestGiphyFromAPI(giphy.value);
        giphy.value = '';
    }

    handleDelete(e){
        e.preventDefault()
        const giphys = document.getElementById('display-giphys');
        giphys.innerHTML = ''
    }

    render() {
        let id = -1
        const allGiphys = this.state.giphy.map(giphy => {
            return(
                <Giphy key={id++} src={giphy.url} alt={giphy.alt} />
            )
        })

        return (
            <div>
                <form>
                    <input type='text' placeholder='Enter a search term' />
                    <button id='btn1' onClick={this.handleSubmit}>Search Giphy</button>
                    <button id='btn2' onClick={this.handleDelete}>Remove Images</button>
                </form>
                <h4>Gif of the day:</h4>
                <Giphy src={this.state.gif.url} alt={this.state.gif.alt} />
                <h4>Searched Gifs:</h4>
                <div id='display-giphys'>{allGiphys}</div>
            </div>
        )
    }
}