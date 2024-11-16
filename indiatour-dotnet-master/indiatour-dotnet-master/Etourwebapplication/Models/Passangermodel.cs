using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Etourwebapplication.Models
{
    public partial class Passangermodel : DbContext
    {
        public Passangermodel()
            : base("name=Passangermodel")
        {
        }

        public virtual DbSet<passanger> passangers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<passanger>()
                .Property(e => e.Cost)
                .HasPrecision(18, 0);
        }
    }
}
