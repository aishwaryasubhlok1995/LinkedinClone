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
        
               <div class="filer row">
               <div class="col-2">               
               
                            <li class=" nav-item dropdown ">
                             <a class="  dropdown-toggle "  id="navbardrop" data-toggle="dropdown">
                             Jobs
                             </a>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" >All</a>
                                <a class="dropdown-item" >People</a>
                                <a class="dropdown-item" >Content</a>
                                <a class="dropdown-item" >Companies</a>
                                <a class="dropdown-item" >Groups</a>
                                <a class="dropdown-item" >Schools</a>
                                </div>
                                </li>
                                </div>
             <div class="col-2"> 
                            <li class=" dropdown ">
                             <a class="  dropdown-toggle border"  id="navbardrop" data-toggle="dropdown">
                            Date Posted
                             </a>
                              <div class="dropdown-menu">
                             
                               
                               <input type="radio" checked="checked" name="radio"></input> Past 24Hours <br></br>
                               <input type="radio" checked="checked" name="radio"></input> Past Week<br></br>
                               <input type="radio" checked="checked" name="radio"></input> Past Month<br></br>
                               <input type="radio" checked="checked" name="radio"></input> Any Time<br></br>
                                            
                                            </div>
                                            </li>
            </div>
                                            <div class="col-2"> 
                                            <li class=" dropdown ">
                             <a class="  dropdown-toggle border"  id="navbardrop" data-toggle="dropdown">
                            LinkedIn Features
                             </a>
                            
                              <div class="dropdown-menu">
                             
                               
                               <input type="radio" checked="checked" name="radio"></input> In Your Network <br></br>
                               <input type="radio" checked="checked" name="radio"></input> Easy Apply<br></br>
                               <input type="radio" checked="checked" name="radio"></input> Under 10 Applicants<br></br>
                           
                                            
                                            </div>
                                            </li>
                                            </div>
                                            <div class="col-2"> 
                                            <li class=" dropdown ">
                             <a class="  dropdown-toggle border"  id="navbardrop" data-toggle="dropdown">
                            Company                             </a>
                              <div class="dropdown-menu">
                             
                               
                               <input type="radio" checked="checked" name="radio"></input> Google <br></br>
                               <input type="radio" checked="checked" name="radio"></input> Facebook<br></br>
                               <input type="radio" checked="checked" name="radio"></input> IBM<br></br>
                               <input type="radio" checked="checked" name="radio"></input> Netflix<br></br>
                                            
                                            </div>
                                            </li>
                                            </div>
                                            <div class="col-2"> 
                                            <li class=" dropdown ">
                             <a class="  dropdown-toggle border"  id="navbardrop" data-toggle="dropdown">
                            Experience Level
                             </a>
                              <div class="dropdown-menu">
                             
                               
                               <input type="radio" checked="checked" name="radio"></input> Internship <br></br>
                               <input type="radio" checked="checked" name="radio"></input> Entry Level<br></br>
                               <input type="radio" checked="checked" name="radio"></input> Aassociate<br></br>
                               <input type="radio" checked="checked" name="radio"></input> Mid-Senior Level<br></br>
                               <input type="radio" checked="checked" name="radio"></input> Director
                               <br></br>
                               <input type="radio"  name="radio"></input> Executive<br></br>
                                            
                                            </div>
                                            </li>
                                            </div>
                                            <div class="col-2"> 
                                            <li>All Filters</li>
                                            </div>
                                            </div>
                                            
        
    
        )}
  }



export default (Filter);