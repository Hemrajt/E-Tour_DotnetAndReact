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
    [RoutePrefix("api/sector")]
    public class sectorsController : ApiController
    {
        private Sectormodel db = new Sectormodel();

        // GET: api/sectors
        public IQueryable<sector> Getsectors()
        {
            return db.sectors;
        }

        // GET: api/sectors/5
        [ResponseType(typeof(sector))]
        public IHttpActionResult Getsector(int id)
        {
            sector sector = db.sectors.Find(id);
            if (sector == null)
            {
                return NotFound();
            }

            return Ok(sector);
        }

        // GET: api/sectors/get1/INT
        [ResponseType(typeof(sector))]
        [Route("get1/{subsectorid}")]
        public IHttpActionResult GetSubsector(String subsectorid)
        {
            IQueryable<sector> sector = db.sectors;
            IEnumerable<sector> subsectorquery = from sec in sector where sec.Subsector_Id == subsectorid select sec;

            if (subsectorquery == null)
            {
                return NotFound();
            }

            return Ok(subsectorquery);
        }

        // PUT: api/sectors/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsector(int id, sector sector)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sector.Sectormaster_Id)
            {
                return BadRequest();
            }

            db.Entry(sector).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sectorExists(id))
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

        // POST: api/sectors
        [ResponseType(typeof(sector))]
        public IHttpActionResult Postsector(sector sector)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sectors.Add(sector);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sector.Sectormaster_Id }, sector);
        }

        // DELETE: api/sectors/5
        [ResponseType(typeof(sector))]
        public IHttpActionResult Deletesector(int id)
        {
            sector sector = db.sectors.Find(id);
            if (sector == null)
            {
                return NotFound();
            }

            db.sectors.Remove(sector);
            db.SaveChanges();

            return Ok(sector);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sectorExists(int id)
        {
            return db.sectors.Count(e => e.Sectormaster_Id == id) > 0;
        }
    }
}