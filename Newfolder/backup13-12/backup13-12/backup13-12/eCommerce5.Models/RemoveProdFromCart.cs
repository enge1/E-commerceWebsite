using System;

namespace eCommerce5.DataAccess
{
    public class RemoveProdFromCartInput
    {
        public Int32? Id { set; get; }
    
      
    }
    public class RemoveProdFromCartOutput
    {
        public String ErrorNumber { set; get; }
        public Int32 Id { set; get; }
     
    }


}
