import React, {Component} from 'react';
import './JobSearch.css'



  class Filter extends Component{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
        }
    
}


  
    render(){

      
              
        return(
        
            <div class="modal-dialog modal-lg">
            <Modal open={this.state.open} onClose={this.closebox} style={{'min-width':'800px'}} center>
            <header class="modal-header">   
            <h2 style={{    'color': 'rgba(0,0,0,.75)'}}>Apply To {property.Company}</h2>
            </header>
            <div class="row">
            <div>
            <img src={image}></img> </div>
            <div class="col-4">
            Aishwariya Bhatt <br></br>
            Student <br></br>
            San Jose
            </div>
            </div>
           
      

          <div style={{'horizontalAlign':'middle'}}>
          <span style={{'display':'block'}}>   
          Email:            
                            <input type="text" placeholder="EmailAddress" onChange={this.propertyTopic} style={{'margin-bottom':'10px','width': '100%','height': '44px','padding':  '9px 14px','font-size':  '10px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
        </span>

            <span style={{'display':'block'}}>
                            Phone Number:  <input type="text" placeholder="PhoneNumber" onChange={this.propertyTopic} style={{'margin-bottom':'10px','width': '100%','height': '44px','padding':  '9px 14px','font-size':  '10px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
            </span>

            Resume(Optional):<br></br>
            <input type="submit" value="Upload Resume" onClick={this.closebox} style={{'vertical-align':'middle','width':'25%','height':'40px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','text-align':'center','cursor':'pointer'}}/>
            <br></br>
              Microsoft Word or PDF only (5MB)
              <br/> <br></br>
              We include a copy of your full profile with your application
              Learn what we do with your resume
<br></br> <br></br>
            <span style={{'justifyContent':'center','display':'flex'}}>
            <input type="submit" value="Cancel" onClick={this.closebox} style={{'vertical-align':'middle','width':'40%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center','cursor':'pointer'}}/>
            
            
            <input type="submit"  value="Submit Application"  onClick={this.sendQuery}  style={{'margin-left':'5px','vertical-align':'middle','width':'40%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center','cursor':'pointer'}}/>

            </span>

          </div>
        </Modal>
        </div>
        
    
        )}
  }



export default (Filter);