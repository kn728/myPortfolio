import React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default UpdateInfo = () => {
    <form>
        <div>
            <header>
                Choose Doctor or Pharmacist Account to edit:
            </header>
            <p>Select ID:</p>
            <input type='text'></input>
            <p>Name:</p>
            <input type='text'></input>
            <p>Email:</p>
            <input type='text'></input>
            <p>Gender:</p>
            <input type= "checkbox" id='gender' name='gender' value='male' >male</input>
            <input type='checkbox' id='gender' name='gender' value='female' >Female</input>
            <input type='checkbox' id='gender' name='gender' value='other' >Other</input>
            <input type='checkbox' id='gender' name='gender' value='notSay' >Prefer not to say</input>

            <p>Birthday:</p>
            <input type='text'></input>
            <p>Address:</p>
            <input type='text'></input>
            <p>Specialty</p>
            <input type='text'></input>
            <br/>
            <button id='onClick'>Update</button>
            
            {/* showing doctor account details */}

            {/* generate report and statistic
             */}
            <p>CREATING REPORT</p>
            <p>Choose Report Type:</p>
            <input type='text'></input>
            <button>Generate Report</button>
        </div>
    </form>


}