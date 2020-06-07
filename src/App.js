import React from 'react';
import './App.css';



class App extends React.Component {

  state ={
    notes: [],
    currentNote: "",
    noteEditing: null,
    currentEdit:""
  }


  addNote =() =>{
    let notes =[...this.state.notes];
    notes.push(this.state.currentNote);
    this.setState({notes, currentNote:''});
  }


  deleteNote = indexToDelete =>{
    let notes = [...this.state.notes].filter(
      (note, index) => index !== indexToDelete
    );
    this.setState({notes});
  }


  componentDidUpdate(prevProps, preState) {
    if (preState.notes.length !== this.state.notes.length) {
      const json = JSON.stringify(this.state.notes);
      localStorage.setItem("notes", json);
    }
  }


  componentDidMount() {
    const json = localStorage.getItem("notes");
    const notes = JSON.parse(json);
    if (notes) {
      this.setState(()=>({notes}))
    }
  }



  setNoteEditing = index => {
    this.setState({ noteEditing:index, currentEdit: this.state.notes[index]});
  }


  editNote = event => {
    this.setState({currentEdit:event.target.value})
  }


  submitEdit = index =>{
    let notes = [...this.state.notes];
    notes[index] = this.state.currentEdit;
    this.setState({notes, noteEditing: null})
  }


  render() {
    return (
      <div className="App">
        <h1>localStorage Note - Demo</h1>

        <textarea className="input" placeholder="Notes"
        value={this.state.currentNote} 
        onChange={event=>this.setState({currentNote: event.target.value})} />
        
        <br/>

        <button className="button" onClick={this.addNote}>
          Submit
        </button>

        {
          this.state.notes.map((note, index) => (

          <div key={index}>

            {note}
            <button onClick={()=>this.deleteNote(index)}>Delete</button>
          
          </div>)
          )
        }

      </div>
    )
  }

}

export default App;
