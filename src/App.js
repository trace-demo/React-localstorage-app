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

    this.state.notes.forEach((note, index)=>{
      if(preState.notes[index] !== note) {
        const json = JSON.stringify(this.state.notes);
        localStorage.setItem("notes", json);
      }
    })
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
        <h1>Note localStorage - DeMO </h1>

        <textarea className="input" placeholder="Notes"
        value={this.state.currentNote} 
        onChange={event=>this.setState({currentNote: event.target.value})} />
        
        <br/>

        <button className="button" onClick={this.addNote}>
          Submit
        </button>


        {

          this.state.notes.map((note, index) => (

            <div className="notes" key={index}>

              {this.state.noteEditing === null || this.state.noteEditing !== index 
              ?(
                <div className="note">
                  <div className="note-content">
                    <div className="note-text">{note}</div>

                    <button onClick={()=>this.setNoteEditing(index)}>
                      Edit
                    </button>

                  </div>

                  <button onClick={()=>this.deleteNote(index)}>
                    Delete
                  </button>
                </div>  

              ):(
                <div className="note">
                  <div className="note-content">
                    <input type="text" value={this.state.currentEdit} 
                    onChange = {event =>this.editNote(event)} />
                    <button onClick={()=>this.submitEdit(index)}>Done</button>
                  </div>
                <button onClick={()=> this.deleteNote(index)}>Delete</button> 
                </div>   
              )
            }            
            </div>
            )
          )

        }

      </div>
    )
  }

}

export default App;
