namespace Etourwebapplication.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("etour.sector")]
    public partial class sector
    {
        [Key]
        public int Sectormaster_Id { get; set; }

        [StringLength(10)]
        public string Sector_Id { get; set; }

        [StringLength(10)]
        public string Subsector_Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Sectorname { get; set; }

        [Required]
        [StringLength(250)]
        public string Imgpath { get; set; }

        public short? Flag { get; set; }
    }
}
