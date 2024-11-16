using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Etourwebapplication.Models
{
    public partial class Bookingmodel : DbContext
    {
        public Bookingmodel()
            : base("name=Bookingmodel")
        {
        }

        public virtual DbSet<booking> bookings { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
