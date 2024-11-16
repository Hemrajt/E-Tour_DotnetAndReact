namespace Etourwebapplication.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("etour.tourpackage")]
    public partial class tourpackage
    {
        [Key]
        public int Package_Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Package_Name { get; set; }

        public int? Sectormaster_Id { get; set; }

        [Column(TypeName = "date")]
        public DateTime Startdate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Enddate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Tourdates { get; set; }
    }
}
