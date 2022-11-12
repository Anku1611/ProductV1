using System;
using System.Collections.Generic;

namespace CustomerProductCoreAPI.Models
{
    public partial class Products
    {
        public int Id { get; set; }
        public string Customer { get; set; } = null!;
        public string? Product { get; set; }
        public decimal Price { get; set; }
    }
}
