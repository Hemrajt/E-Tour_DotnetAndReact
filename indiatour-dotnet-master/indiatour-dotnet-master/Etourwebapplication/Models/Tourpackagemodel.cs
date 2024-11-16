using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Etourwebapplication.Models
{
    public partial class Tourpackagemodel : DbContext
    {
        public Tourpackagemodel()
            : base("name=Tourpackagemodel")
        {
        }

        public virtual DbSet<tourpackage> tourpackages { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
