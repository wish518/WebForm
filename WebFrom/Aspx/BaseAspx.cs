using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace WebFrom.Aspx
{
    public class BaseAspx : System.Web.UI.Page 
    {
        public SqlCommand cmd = new SqlCommand();
        public string CommandText {
            get { return cmd.CommandText; }
            set { cmd.CommandText=value; }
        }
        public BaseAspx()
        {
            SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["WISH"].ConnectionString);
            cmd.CommandTimeout = 0;
            cmd.Connection = conn; 
            cmd.CommandType = System.Data.CommandType.Text;
        }
    }
}