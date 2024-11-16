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
    [RoutePrefix("api/customer")]
    public class customersController : ApiController
    {
        private Customermodel db = new Customermodel();

        // GET: api/customers
        public IQueryable<customer> Getcustomers()
        {
            return db.customers;
        }

        // GET: api/customers/5
        [ResponseType(typeof(customer))]
        [HttpGet]
        public IHttpActionResult Getcustomerbyid(int id)
        {
            IEnumerable<customer> customer = db.customers;
            IEnumerable<customer> newcustomer = (from c in customer where c.Cust_Id == id select c).ToList();
            if (newcustomer == null)
            {
                return NotFound();
            }
            return Ok(newcustomer);
        }


        [ResponseType(typeof(customer))]
        [Route("login")]
        [HttpPost]
        public IHttpActionResult Getcustomer(customer customers)
        {
            IEnumerable<customer> customer = db.customers;
            IEnumerable<customer> newcustomer = (from c in customer where c.Email == customers.Email select c).ToList();
            customer c1 = null;

            if (newcustomer != null)
            {
                foreach (customer cust in newcustomer)
                {

                    String pass = cust.Password;

                    if (pass.Equals(customers.Password))
                    {
                        c1 = new customer(cust.Cust_Id, cust.Email, cust.FirstName, cust.LastName, cust.Roles);
                    }
                }
                return Ok(c1);
            }
            else
            {
                return BadRequest();
            }
        }


        // PUT: api/customers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putcustomer(int id, customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.Cust_Id)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!customerExists(id))
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

        // POST: api/customers
        [ResponseType(typeof(customer))]
        public IHttpActionResult Postcustomer(customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.customers.Add(customer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customer.Cust_Id }, customer);
        }

        // DELETE: api/customers/5
        [ResponseType(typeof(customer))]
        public IHttpActionResult Deletecustomer(int id)
        {
            customer customer = db.customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool customerExists(int id)
        {
            return db.customers.Count(e => e.Cust_Id == id) > 0;
        }
    }
}