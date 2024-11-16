using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Etourwebapplication.Models
{
    public partial class Iternerymodel : DbContext
    {
        public Iternerymodel()
            : base("name=Iternerymodel")
        {
        }

        public virtual DbSet<itinerary> itineraries { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
