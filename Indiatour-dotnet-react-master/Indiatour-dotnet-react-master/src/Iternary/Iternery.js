
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useParams } from 'react-router-dom';
import React  from 'react';
function Iternery(props) {

    const [iternery, setIternery] = useState([]);
    const { SSid } = useParams();
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/iternery/getdetails/${SSid}`)
            .then(res => res.json())
            .then((result) => { setIternery(result); }
            );
    }, []);

    const [pack, setPackage] = useState([]);

    useEffect(() => {
        fetch(`${URL_STRING}/tourpackages/${SSid}`)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);
  
    function convertdate(date)
    {
        const date1=new Date(date);
        const converteddate = `${date1.getFullYear()}-${(date1.getMonth() + 1) < 10 ? `0${(date1.getMonth() + 1)}` : `${(date1.getMonth() + 1)}`}-${(date1.getDate()) < 10 ? `0${(date1.getDate())}` : `${(date1.getDate())}`}`

        return converteddate;
    }
    function calD(date1,date2){
        const date3=new Date(date1);
        const date4=new Date(date2);
        const diff = Math.abs(date4 - date3);
        const fin=diff / (1000 * 60 * 60 * 24);
        return(fin)
        ;            
    }
    function calN(date1,date2){
        const date3=new Date(date1);
        const date4=new Date(date2);
        const diff = Math.abs(date4 - date3);
        const fin=diff / (1000 * 60 * 60 * 24);
        return(fin-1)
        ;            
    }
   
    return (
        
        <div>
            <div>
            {/*  */} {/* {pack.slice(0,count).map((cust,i) => ( */}
            {pack.filter((cust, i) => i <=0).map((cust,i) => ( 
                <div key={i} >
                    <hr></hr>
                         <p>Itnerary is valid from {convertdate(cust.Startdate)} to {convertdate(cust.Enddate)}</p>
                         <h3>{cust.Package_Name}</h3>
                         <p> {calD(`${cust.Startdate}`,`${cust.Enddate}`)} Days {calN(`${cust.Startdate}`,`${cust.Enddate}`)}  Hotel Nights</p>
                        {/* <button onClick={addMore}>Add More</button> */}
                         </div>
                   
                   )) }
                </div>
                <hr></hr>
             {iternery.map(itr => (
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{itr.Day}</Accordion.Header>
                                <Accordion.Body>
                                    {itr.Description}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
            <br></br>
            <br></br>


        </div>
    );
}

export default Iternery;