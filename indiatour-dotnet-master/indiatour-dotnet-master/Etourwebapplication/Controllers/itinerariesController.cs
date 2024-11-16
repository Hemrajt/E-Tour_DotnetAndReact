using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Etourwebapplication.Models;

namespace Etourwebapplication.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    [RoutePrefix("api/iternery")]
    public class itinerariesController : ApiController
    {
        private Iternerymodel db = new Iternerymodel();

        // GET: api/itineraries
        public IQueryable<itinerary> Getitineraries()
        {
            return db.itineraries;
        }

        // GET: api/iternery/getdetails/5
        [ResponseType(typeof(itinerary))]
        [Route("getdetails/{id}")]
        public IHttpActionResult Getitinerary(int id)
        {
            IEnumerable<itinerary> itinerary = db.itineraries;
            IEnumerable<itinerary> data = from iti in itinerary where iti.SectorMaster_Id == id select iti;
            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        // PUT: api/itineraries/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putitinerary(int id, itinerary itinerary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itinerary.Iternery_Id)
            {
                return BadRequest();
            }

            db.Entry(itinerary).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!itineraryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/itineraries
        [ResponseType(typeof(itinerary))]
        public IHttpActionResult Postitinerary(itinerary itinerary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.itineraries.Add(itinerary);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = itinerary.Iternery_Id }, itinerary);
        }

        // DELETE: api/itineraries/5
        [ResponseType(typeof(itinerary))]
        public IHttpActionResult Deleteitinerary(int id)
        {
            itinerary itinerary = db.itineraries.Find(id);
            if (itinerary == null)
            {
                return NotFound();
            }

            db.itineraries.Remove(itinerary);
            db.SaveChanges();

            return Ok(itinerary);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool itineraryExists(int id)
        {
            return db.itineraries.Count(e => e.Iternery_Id == id) > 0;
        }
    }
}