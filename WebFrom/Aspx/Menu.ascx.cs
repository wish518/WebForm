using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebFrom.Aspx
{
    public partial class Menu : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           // MVC.Attributes.Add("onclick", "SetArchitecture(event)");
            //VUE.Attributes.Add("onclick", "SetArchitecture(event)");
        }
/*
        [WebMethod]
        public void Architecture_Click(string PageArchitecture)
        {
              base.CommandText = "SELECT * FROM PageData WHERE PageArchitecture=@PageArchitecture ";
              cmd.Parameters.Add("@PageArchitecture", SqlDbType.VarChar).Value = PageArchitecture;
              SqlDataAdapter da = new SqlDataAdapter(cmd);
              DataSet ds = new DataSet();
              da.Fill(ds);//把資料庫資料填入到DataSet

              string result = "";
              foreach (DataRow row in ds.Tables[0].Rows)
              {
                  result += "<input type=%gg%button%gg% class=%gg%Page-btn btn btn-outline-info%gg% onclick=%gg%Architecture_Click%gg% value =%gg%" + row["PageName"].ToString() + "%gg%  /> ";
              }
              //DivPageServer.InnerHtml = result.Replace("%gg%", "" + '"');
           
        }*/
    }
}