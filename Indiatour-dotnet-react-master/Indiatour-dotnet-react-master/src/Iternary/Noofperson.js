import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React  from 'react';
function Noofperson(){

    const [booking, setBooking] = useState([]);
   const { bkid,cid}=useParams();
   let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/passanger/getdetails/${bkid}/${cid}`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );
    }, []);

    function calage(date1){

               
        const date2=new Date(date1);
        const today=new Date();
        const date3=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const date4=new Date(date3)
        const diff = Math.ceil(date4 - date2);
        const fin=Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        
       
        return (fin)
        ;            
    }
    function calperson(person)
    {
        var acount=0;
        var ccount=0;
        person.map(per=>{
            let age=calage(per.DOB);
            if(age>12)
            {
               acount++ 
            }
            else
            {
                ccount++
            }
        })

        let totalcount=acount+" Adults ,"+ccount+" Child ";
        return (totalcount)
    }
    return(

        <div>
            <h4>{calperson(booking)}</h4>
        </div>
    );
}

export default Noofperson;