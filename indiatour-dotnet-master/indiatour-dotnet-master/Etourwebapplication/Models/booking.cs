namespace Etourwebapplication.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("etour.booking")]
    public partial class booking
    {
        [Key]
        public int Booking_Id { get; set; }

        [Column(TypeName = "date")]
        public DateTime Bookingdate { get; set; }

        public int Cust_Id { get; set; }

        public int Package_Id { get; set; }

        public int Passangers { get; set; }

        public float Touramount { get; set; }

        public float Taxes { get; set; }

        public float Totalamount { get; set; }

        public int? Flag { get; set; }
    }
}
