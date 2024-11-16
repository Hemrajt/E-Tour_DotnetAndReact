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
    [RoutePrefix("api/cost")]
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class costsController : ApiController
    {
        private Costmodel db = new Costmodel();
        private Sectormodel secdb = new Sectormodel();

        // GET: api/costs
        public IQueryable<cost> Getcosts()
        {
            return db.costs;
        }

        // GET: api/costs/5
        [ResponseType(typeof(cost))]
        public IHttpActionResult Getcost(int id)
        {
            IEnumerable<cost> cost = db.costs;
            IEnumerable<cost> cst = (from c in cost where c.Sectormaster_Id == id select c).ToList();
            if (cst == null)
            {
                return NotFound();
            }

            return Ok(cst);
        }


        //get api/cost/getcost/sectormasterid
        [ResponseType(typeof(cost))]
        [Route("getcost/{id}")]
        public IHttpActionResult Getcostbysubsectorid(String id)
        {
            IEnumerable<cost> cst = db.costs;
            IEnumerable<sector> sectors = secdb.sectors;
            int sectormasterid = 0;
            List<cost> listid = new List<cost>();

            foreach (sector sec in sectors)
            {
                String subid = sec.Subsector_Id;
                if (subid.Equals(id))
                {
                    sectormasterid = sec.Sectormaster_Id;
                    IEnumerable<cost> c1 = (from cs in cst where cs.Sectormaster_Id == sectormasterid select cs).ToList();

                    listid.AddRange(c1);
                }
            }

            if (listid == null)
            {
                return NotFound();
            }
            return Ok(listid);
        }


        // PUT: api/costs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putcost(int id, cost cost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cost.Cost_Id)
            {
                return BadRequest();
            }

            db.Entry(cost).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!costExists(id))
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

        // POST: api/costs
        [ResponseType(typeof(cost))]
        public IHttpActionResult Postcost(cost cost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.costs.Add(cost);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cost.Cost_Id }, cost);
        }

        // DELETE: api/costs/5
        [ResponseType(typeof(cost))]
        public IHttpActionResult Deletecost(int id)
        {
            cost cost = db.costs.Find(id);
            if (cost == null)
            {
                return NotFound();
            }

            db.costs.Remove(cost);
            db.SaveChanges();

            return Ok(cost);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool costExists(int id)
        {
            return db.costs.Count(e => e.Cost_Id == id) > 0;
        }
    }
}