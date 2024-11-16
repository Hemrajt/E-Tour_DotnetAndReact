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
    [RoutePrefix("api/bookingtour")]
    public class bookingsController : ApiController
    {
        private Bookingmodel db = new Bookingmodel();
        private passangersController pcontroller = new passangersController();

        // GET: api/bookings
        public IQueryable<booking> Getbookings()
        {
            return db.bookings;
        }

        // GET: api/bookings/5
        [ResponseType(typeof(booking))]
        public IHttpActionResult Getbooking(int id)
        {
            booking booking = db.bookings.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        //get api/bookingtour/getallcanceltour
        [ResponseType(typeof(booking))]
        [Route("getallcanceltour")]
        [HttpGet]
        public IHttpActionResult Getbookingbyfalg()
        {
            IEnumerable<booking> booking = db.bookings;
            IEnumerable<booking> newbooking = (from b in booking where b.Flag == 1 select b).ToList();
            if (newbooking == null)
            {
                return NotFound();
            }

            return Ok(newbooking);
        }

        //get api/bookingtour/getbookings/custid
        [ResponseType(typeof(booking))]
        [Route("getbookings/{custid}")]
        [HttpGet]
        public IHttpActionResult Getbookingbycustid(int custid)
        {
            IEnumerable<booking> booking = db.bookings;
            IEnumerable<booking> newbooking = (from b in booking where b.Cust_Id == custid select b).ToList();
            if (newbooking == null)
            {
                return NotFound();
            }

            return Ok(newbooking);
        }
        //PUT 
        [ResponseType(typeof(booking))]
        [Route("setflag/{bookingid}")]
        [HttpPut]
        public IHttpActionResult setflagone(int bookingid)
        {
            IEnumerable<booking> booking = db.bookings;
            IEnumerable<booking> newbooking = (from bk in booking where bk.Booking_Id == bookingid select bk).ToList();

            foreach(booking book in newbooking)
            {
                book.Flag = 1;
                
            }
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!bookingExists(bookingid))
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


        // PUT: api/bookings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putbooking(int id, booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != booking.Booking_Id)
            {
                return BadRequest();
            }

            db.Entry(booking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!bookingExists(id))
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

        // POST: api/bookings
        [ResponseType(typeof(booking))]
        public IHttpActionResult Postbooking(booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            pcontroller.Setpassangerflag();
            db.bookings.Add(booking);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = booking.Booking_Id }, booking);
        }

        // DELETE: api/bookings/5
        [ResponseType(typeof(booking))]
        [HttpDelete]
        public IHttpActionResult Deletebooking(int id)
        {
            booking booking = db.bookings.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            db.bookings.Remove(booking);
            db.SaveChanges();

            return Ok(booking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool bookingExists(int id)
        {
            return db.bookings.Count(e => e.Booking_Id == id) > 0;
        }
    }
}