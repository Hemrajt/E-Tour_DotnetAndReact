using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Etourwebapplication.Models
{
    public partial class Costmodel : DbContext
    {
        public Costmodel()
            : base("name=Costmodel")
        {
        }

        public virtual DbSet<cost> costs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
