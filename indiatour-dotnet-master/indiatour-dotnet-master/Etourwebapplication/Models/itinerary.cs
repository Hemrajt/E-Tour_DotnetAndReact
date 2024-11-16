namespace Etourwebapplication.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("etour.itinerary")]
    public partial class itinerary
    {
        [Key]
        public int Iternery_Id { get; set; }

        [StringLength(500)]
        public string Day { get; set; }

        [StringLength(250)]
        public string Startlocation { get; set; }

        public string Description { get; set; }

        public int? SectorMaster_Id { get; set; }
    }
}
