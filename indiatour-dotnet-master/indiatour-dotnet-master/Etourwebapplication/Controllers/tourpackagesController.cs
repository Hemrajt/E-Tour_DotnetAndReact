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
    [RoutePrefix("api/package")]
    public class tourpackagesController : ApiController
    {
        private Tourpackagemodel db = new Tourpackagemodel();

        // GET: api/tourpackages
        public IQueryable<tourpackage> Gettourpackages()
        {
            return db.tourpackages;
        }

        // GET: api/tourpackages/5
        [ResponseType(typeof(tourpackage))]
        public IHttpActionResult Gettourpackage(int id)
        {
            IEnumerable<tourpackage> tourpackage = db.tourpackages;
            IEnumerable<tourpackage> pack = from p in tourpackage where p.Sectormaster_Id == id select p;
            if (pack == null)
            {
                return NotFound();
            }

            return Ok(pack);
        }
        //get api/package/getpackage/packid
        [ResponseType(typeof(tourpackage))]
        [Route("getpackage/{packid}")]
        [HttpGet]
        public IHttpActionResult Gettourpackagebypkgid(int packid)
        {
            IEnumerable<tourpackage> tourpackage = db.tourpackages;
            IEnumerable<tourpackage> pack = (from p in tourpackage where p.Package_Id == packid select p).ToList();

            if (pack == null)
            {
                return NotFound();
            }
            return Ok(pack);
        }

        // PUT: api/tourpackages/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttourpackage(int id, tourpackage tourpackage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tourpackage.Package_Id)
            {
                return BadRequest();
            }

            db.Entry(tourpackage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tourpackageExists(id))
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

        // POST: api/tourpackages
        [ResponseType(typeof(tourpackage))]
        public IHttpActionResult Posttourpackage(tourpackage tourpackage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tourpackages.Add(tourpackage);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tourpackage.Package_Id }, tourpackage);
        }

        // DELETE: api/tourpackages/5
        [ResponseType(typeof(tourpackage))]
        public IHttpActionResult Deletetourpackage(int id)
        {
            tourpackage tourpackage = db.tourpackages.Find(id);
            if (tourpackage == null)
            {
                return NotFound();
            }

            db.tourpackages.Remove(tourpackage);
            db.SaveChanges();

            return Ok(tourpackage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tourpackageExists(int id)
        {
            return db.tourpackages.Count(e => e.Package_Id == id) > 0;
        }
    }
}