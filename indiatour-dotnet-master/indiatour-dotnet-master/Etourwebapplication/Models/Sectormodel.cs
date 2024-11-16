using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Etourwebapplication.Models
{
    public partial class Sectormodel : DbContext
    {
        public Sectormodel()
            : base("name=Sectormodel")
        {
        }

        public virtual DbSet<sector> sectors { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
