namespace Etourwebapplication.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("etour.passanger")]
    public partial class passanger
    {
        [Key]
        public int Pass_Id { get; set; }

        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        public string Mobile { get; set; }

        [Required]
        public string Address { get; set; }

        public string Passport { get; set; }

        [Required]
        public string Adharcard { get; set; }

        [Column(TypeName = "date")]
        public DateTime DOB { get; set; }

        [Required]
        public string Gender { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public int Package_Id { get; set; }

        public int Customer_Id { get; set; }

        public decimal Cost { get; set; }

        public string Pincode { get; set; }

        public int Flag { get; set; }
    }
}
