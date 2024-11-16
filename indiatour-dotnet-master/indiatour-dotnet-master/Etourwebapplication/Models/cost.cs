namespace Etourwebapplication.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("etour.cost")]
    public partial class cost
    {
        [Key]
        public int Cost_Id { get; set; }

        public int? Sectormaster_Id { get; set; }

        public float? Singleoccupancy { get; set; }

        public float? Twinperson { get; set; }

        public float? Triplesharing { get; set; }

        public float? Childwithparents { get; set; }

        public float? Childwithoutparents { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Validfrom { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Validto { get; set; }
    }
}
