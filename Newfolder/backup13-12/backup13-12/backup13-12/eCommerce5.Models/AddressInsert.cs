using System;

namespace eCommerce5.DataAccess
{
    public class AddressInsertInput
    {
        public string Region { set; get; }
        public string City { set; get; }
        public string StreetName { set; get; }
        public Int32 BuildingNumber { set; get; }
        public Int32 Floor { set; get; }
        public string Landmark { set; get; }
        public Int32 ZipCode { set; get; }
    }
    public class AddressInsertOutput
    {
        public string ErrorMessage { set; get; }
      
    }
}
