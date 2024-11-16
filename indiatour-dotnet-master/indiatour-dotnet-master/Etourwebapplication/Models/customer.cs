namespace Etourwebapplication.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("etour.customer")]
    public partial class customer
    {
        public customer()
        {
        }
        public customer(int Cust_Id, String Email, String FirstName, String LastName, int Roles)
        {
            this.Cust_Id = Cust_Id;
            this.Email = Email;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Roles = Roles;
        }


        [Key]
        public int Cust_Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Column(TypeName = "date")]
        public DateTime DOB { get; set; }

        [Required]
        [StringLength(10)]
        public string Gender { get; set; }

        [Required]
        [StringLength(100)]
        public string Mobile { get; set; }

        public int Roles { get; set; }
    }
}
