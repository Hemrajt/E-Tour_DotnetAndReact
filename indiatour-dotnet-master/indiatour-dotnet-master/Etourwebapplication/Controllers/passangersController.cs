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
    [RoutePrefix("api/passanger")]
    public class passangersController : ApiController
    {
        private Passangermodel db = new Passangermodel();

        // GET: api/passangers
        public IQueryable<passanger> Getpassangers()
        {
            return db.passangers;
        }

        // GET: api/passangers/5
        [ResponseType(typeof(passanger))]
        public IHttpActionResult Getpassanger(int id)
        {
            passanger passanger = db.passangers.Find(id);
            if (passanger == null)
            {
                return NotFound();
            }

            return Ok(passanger);
        }

        //api/passanger/getdetails/packid/custid
        [Route("getdetails/{packid}/{custid}")]
        public IHttpActionResult Getpassangerbyid(int custid, int packid)
        {
            IEnumerable<passanger> passanger = db.passangers;
            IEnumerable<passanger> newpassanger1;
            IEnumerable<passanger> newpassanger2;
            IEnumerable<passanger> newpassanger3 = null;
            if (passanger != null)
            {
                newpassanger1 = from p in passanger where p.Customer_Id == custid select p;
                if (newpassanger1 != null)
                {
                    newpassanger2 = from p in newpassanger1 where p.Package_Id == packid select p;
                    if (newpassanger2 != null)
                    {
                        newpassanger3 = from p in newpassanger2 where p.Flag == 0 select p;
                    }

                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }
            return Ok(newpassanger3);
        }

        //api/passanger/Cancelpassanger
        [Route("Cancelpassanger")]
        [HttpDelete]
        public IHttpActionResult DeletePassangerbyflag()
        {
            IEnumerable<passanger> passanger = db.passangers;
            IEnumerable<passanger> newpassanger = (from p in passanger where p.Flag == 0 select p).ToList();

            if (newpassanger != null)
            {
                foreach (passanger p1 in newpassanger)
                {
                    db.passangers.Remove(p1);
                    db.SaveChanges();
                }
            }
            return Ok(newpassanger);
        }

        public IHttpActionResult Setpassangerflag()
        {
            IEnumerable<passanger> passanger = db.passangers;
            IEnumerable<passanger> newpassanger = (from p in passanger where p.Flag == 0 select p).ToList();

            foreach (passanger p in newpassanger)
            {
                p.Flag = 1;
            }
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                 throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // PUT: api/passangers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putpassanger(int id, passanger passanger)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != passanger.Pass_Id)
            {
                return BadRequest();
            }

            db.Entry(passanger).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!passangerExists(id))
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

        // POST: api/passanger/postpassanger
        [Route("postpassanger")]
        [HttpPost]
        public IHttpActionResult Postpassanger(passanger passanger)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.passangers.Add(passanger);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = passanger.Pass_Id }, passanger);
        }

        // DELETE: api/passangers/5
        [ResponseType(typeof(passanger))]
        public IHttpActionResult Deletepassanger(int id)
        {
            passanger passanger = db.passangers.Find(id);
            if (passanger == null)
            {
                return NotFound();
            }

            db.passangers.Remove(passanger);
            db.SaveChanges();

            return Ok(passanger);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool passangerExists(int id)
        {
            return db.passangers.Count(e => e.Pass_Id == id) > 0;
        }
    }
}