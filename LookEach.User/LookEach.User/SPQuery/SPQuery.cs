using DevExpress.Data.Linq.Helpers;
using LookEach.User.DTO;
using LookEach.User.Model;
using LookEach.User.Pages;
using LookEach.User.Utilites;
using LookEach.User.ViewModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Numerics;
using System.Reflection;

namespace LookEach.User.SPQuery
{
    public class SPQuery
    {
        private IJSRuntime _jsRuntime { get; set; }
        private readonly string StringConnection = "Server=cosplane.asia;Database=Lookeach;Encrypt=false;User Id=lookeach;Password=LookEach!@#123...";
        public SPQuery(IJSRuntime jSRuntime)
        {
            _jsRuntime = jSRuntime;
        }
        public SPQuery()
        {

        }
        //File
        public async Task<string> DbFileSave(int FileSize, string FileType, int FileDuration, string ThumbnailData, string FileName = "")
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("ws_Files_Save", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        //command.Parameters.AddWithValue("@FileID", 0); // Output parameter
                        command.Parameters.AddWithValue("@FileName", FileName);
                        command.Parameters.AddWithValue("@FileSize", FileSize);
                        command.Parameters.AddWithValue("@FileData", "abcxyz");
                        command.Parameters.AddWithValue("@FileType", FileType);
                        command.Parameters.AddWithValue("@FileDuration", FileDuration);
                        command.Parameters.AddWithValue("@ThumbnailData", ThumbnailData);

                        // command.Parameters.Add(new SqlParameter("@ParameterName", parameterValue));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var json = JsonConvert.SerializeObject(ds);
                                return json;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return string.Empty;
                }
            }
        }

        public async Task<string> DbFileGet(int fileId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("ws_File_GetNameByID", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@ID", fileId));

                        // command.Parameters.Add(new SqlParameter("@ParameterName", parameterValue));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                DataRow firstRow = ds.Tables[0].Rows[0];
                                var fileName = firstRow["FileName"].ToString();
                                var fileType = firstRow["FileType"].ToString();
                                var fullFileName = fileName + fileType;
                                return fullFileName;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return string.Empty;
                }
            }
        }
        //Role
        public async Task<RoleModel> GetRoleAsync(string userId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand("ws_Roles_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Thêm các tham số cho stored procedure nếu cần thiết
                        command.Parameters.Add(new SqlParameter("@UserId", userId));

                        // command.Parameters.Add(new SqlParameter("@ParameterName", parameterValue));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var role = ConvertToListFromDataTable<RoleModel>(ds.Tables[0]).FirstOrDefault();
                                return role;
                            }
                            else return null;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }

        //Product
        public async Task<List<ProductDetailViewMode>> GetProductAsync(string userId, int type)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("ws_Products_User_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@Id", userId));
                        command.Parameters.Add(new SqlParameter("@Type", type));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var pros = (from DataRow row in ds.Tables[0].Rows
                                            select new ProductDetailViewMode
                                            {
                                                Id = row["Id"].ToString(),
                                                Name = row["Name"].ToString(),
                                                Quantity = Convert.ToInt32(row["Quantity"].ToString()),
                                                Price = Convert.ToDecimal(row["Price"].ToString()),
                                                Description = row["Description"].ToString(),
                                                BrandId = row["BrandId"].ToString(),
                                                CategoryId = row["CategoryId"].ToString(),
                                                ObjectTypeId = Convert.ToInt32(row["ObjectTypeId"].ToString()),
                                                Material = row["Material"].ToString(),
                                                Height = Convert.ToInt32(row["Height"].ToString()),
                                                Circumference = Convert.ToInt32(row["Circumference"].ToString()),
                                                Waist = Convert.ToInt32(row["Waist"].ToString()),
                                                Hips = Convert.ToInt32(row["Hips"].ToString()),
                                                Origin = row["Origin"].ToString(),
                                                CreatedOn = Convert.ToDateTime(row["CreatedOn"].ToString())
                                            }).ToList();

                                if (pros != null)
                                {
                                    foreach (var product in pros)
                                    {
                                        product.Files = await GetProductFileAsync(product.Id);
                                        product.ColorChoices = await GetProductColorAsync(product.Id);
                                        product.SizeChoices = await GetProductSizeAsync(product.Id);
                                    }

                                }
                                return pros;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }
        public async Task<List<ProductDetailViewMode>> GetTopProductByShopAsync(string userId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("ws_Products_Shop_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@Id", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var pros = (from DataRow row in ds.Tables[0].Rows
                                            select new ProductDetailViewMode
                                            {
                                                Id = row["Id"].ToString(),
                                                Name = row["Name"].ToString(),
                                                Quantity = Convert.ToInt32(row["Quantity"].ToString()),
                                                Price = Convert.ToDecimal(row["Price"].ToString()),
                                                Description = row["Description"].ToString(),
                                                BrandId = row["BrandId"].ToString(),
                                                CategoryId = row["CategoryId"].ToString(),
                                                ObjectTypeId = Convert.ToInt32(row["ObjectTypeId"].ToString()),
                                                Material = row["Material"].ToString(),
                                                Height = Convert.ToInt32(row["Height"].ToString()),
                                                Circumference = Convert.ToInt32(row["Circumference"].ToString()),
                                                Waist = Convert.ToInt32(row["Waist"].ToString()),
                                                Hips = Convert.ToInt32(row["Hips"].ToString()),
                                                Origin = row["Origin"].ToString(),
                                                CreatedOn = Convert.ToDateTime(row["CreatedOn"].ToString())
                                            }).ToList();

                                if (pros != null)
                                {
                                    foreach (var product in pros)
                                    {
                                        product.Files = await GetProductFileAsync(product.Id);
                                        product.ColorChoices = await GetProductColorAsync(product.Id);
                                        product.SizeChoices = await GetProductSizeAsync(product.Id);
                                    }

                                }
                                return pros;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }
        public async Task<ProductDetailViewMode> GetProductDetailAsync(string userId, string proId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand("ws_ProductDetail_User_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@ProductId", proId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var pro = (from DataRow row in ds.Tables[0].Rows
                                           select new ProductDetailViewMode
                                           {
                                               Id = row["Id"].ToString(),
                                               Name = row["Name"].ToString(),
                                               Quantity = Convert.ToInt32(row["Quantity"].ToString()),
                                               Price = Convert.ToDecimal(row["Price"].ToString()),
                                               Description = row["Description"].ToString(),
                                               BrandId = row["BrandId"].ToString(),
                                               CategoryId = row["CategoryId"].ToString(),
                                               ObjectTypeId = Convert.ToInt32(row["ObjectTypeId"].ToString()),
                                               Material = row["Material"].ToString(),
                                               Height = Convert.ToInt32(row["Height"].ToString()),
                                               Circumference = Convert.ToInt32(row["Circumference"].ToString()),
                                               Waist = Convert.ToInt32(row["Waist"].ToString()),
                                               Hips = Convert.ToInt32(row["Hips"].ToString()),
                                               Origin = row["Origin"].ToString(),
                                               CreatedOn = Convert.ToDateTime(row["CreatedOn"].ToString()),
                                               CreatedBy = row["CreatedBy"].ToString()
                                           }).FirstOrDefault();

                                if (pro != null)
                                {
                                    pro.Files = await GetProductFileAsync(pro.Id);
                                    pro.ColorChoices = await GetProductColorAsync(pro.Id);
                                    pro.SizeChoices = await GetProductSizeAsync(pro.Id);

                                }
                                return pro;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }
        public async Task<List<FileUpload>> GetProductFileAsync(string productId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_ProductFiles_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@ProductId", productId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var files = ConvertToListFromDataTable<FileUpload>(ds.Tables[0]).ToList();
                                return files;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }
        private async Task<List<Model.Color>> GetProductColorAsync(string productId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_ColorProduct_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@ProductsId", productId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var colors = ConvertToListFromDataTable<Model.Color>(ds.Tables[0]).ToList();
                                return colors;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }
        private async Task<List<Model.Size>> GetProductSizeAsync(string productId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_ProductSize_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@ProductsId", productId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var sizes = ConvertToListFromDataTable<Model.Size>(ds.Tables[0]).ToList();
                                return sizes;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }
        //Cart 
        public async Task<int> SaveCartAsync(string userId, string productId, string sizeId, int amount)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Cart_Save", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));
                        command.Parameters.Add(new SqlParameter("@ProductId", productId));
                        command.Parameters.Add(new SqlParameter("@SizeId", sizeId));
                        command.Parameters.Add(new SqlParameter("@Amount", amount));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                DataRow firstRow = ds.Tables[0].Rows[0];
                                var result = firstRow["Result"].ToString();
                                return Convert.ToInt32(result);
                            }
                            else return 0;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return 0;
                }
            }
        }
        public async Task<bool> ClearCartAsync(string userId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Cart_Delete_All", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                DataRow firstRow = ds.Tables[0].Rows[0];
                                var result = firstRow["Result"].ToString();
                                return result == "Ok" ? true : false;
                            }
                            else return false;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return false;
                }
            }
        }


        public async Task<List<CartModel>> LoadCartAsync(string userId)
        {

            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Cart_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var carts = ConvertToListFromDataTable<CartModel>(ds.Tables[0]).ToList();
                                if (carts != null)
                                {
                                    foreach (var item in carts)
                                    {
                                        item.Files = await GetProductFileAsync(item.ProductId);
                                    }
                                }
                                return carts;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }

        public async Task<List<CartDetailViewModel>> LoadCartDetailAsync(string userId)
        {

            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Cart_Detail_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var carts = ConvertToListFromDataTable<CartDetailViewModel>(ds.Tables[0]).ToList();
                                if (carts != null)
                                {
                                    foreach (var item in carts)
                                    {
                                        item.Files = await GetProductFileAsync(item.ProductId);
                                        item.ColorChoices = await GetProductColorAsync(item.ProductId);
                                    }
                                }
                                return carts;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }

        public async Task<bool> DeteleItemCartAsync(string userId, string proId, string sizeid)
        {

            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Cart_Delete", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));
                        command.Parameters.Add(new SqlParameter("@ProductId", proId));
                        command.Parameters.Add(new SqlParameter("@SizeId", sizeid));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                DataRow firstRow = ds.Tables[0].Rows[0];
                                var result = firstRow["Result"].ToString();

                                if (result != "Ok")
                                {
                                    return false;
                                }
                                else return true;
                            }
                            else return false;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return false;
                }
            }
        }

        public async Task<List<Voucher>> LoadVoucerAsync(string userId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Vouchers_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var vouchers = (from DataRow row in ds.Tables[0].Rows
                                                select new Voucher
                                                {
                                                    Id = row["Id"].ToString(),
                                                    Name = row["Name"].ToString(),
                                                    Code = row["Code"].ToString(),
                                                    StartTime = Convert.ToDateTime(row["StartTime"].ToString()),
                                                    EndTime = Convert.ToDateTime(row["EndTime"].ToString()),
                                                    IsActived = Convert.ToBoolean(row["IsActived"].ToString()),
                                                    PriceCondition = Convert.ToDecimal(row["PriceCondition"].ToString()),
                                                    SlotAvailable = Convert.ToInt32(row["SlotAvailable"].ToString()),
                                                    CurrentSlot = Convert.ToInt32(row["CurrentSlot"].ToString()),
                                                    CreatedBy = row["CreatedBy"].ToString(),
                                                    LevelOff = float.TryParse(row["LevelOff"].ToString(), out float result) ? result : 0,
                                                    IsSystem = false
                                                }).ToList();

                                return vouchers;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }

        public async Task<bool> CrateOrderAsync()
        {
            return false;
            //using (SqlConnection connection = new SqlConnection(StringConnection))
            //{
            //    try
            //    {
            //        connection.Open();
            //        var product = new ProductDetailViewMode();
            //        using (SqlCommand command = new SqlCommand("ws_Orders_Save", connection))
            //        {
            //            command.CommandType = CommandType.StoredProcedure;
            //            command.Parameters.Add(new SqlParameter("@Id", userId));
            //            command.Parameters.Add(new SqlParameter("@Address", productId));
            //            command.Parameters.Add(new SqlParameter("@Email", sizeId));
            //            command.Parameters.Add(new SqlParameter("@Phone", amount));

            //            command.Parameters.Add(new SqlParameter("@UserId", amount));
            //            command.Parameters.Add(new SqlParameter("@MerchantId", amount));
            //            command.Parameters.Add(new SqlParameter("@Note", amount));
            //            command.Parameters.Add(new SqlParameter("@Amount", amount));
            //            command.Parameters.Add(new SqlParameter("@Tax", amount));
            //            command.Parameters.Add(new SqlParameter("@Total", amount));
            //            command.Parameters.Add(new SqlParameter("@PaymentMethodId", amount));

            //            using (SqlDataAdapter adapter = new SqlDataAdapter(command))
            //            {
            //                DataSet ds = new DataSet();
            //                adapter.Fill(ds);

            //                if (ds != null)
            //                {
            //                    DataRow firstRow = ds.Tables[0].Rows[0];
            //                    var result = firstRow["Result"].ToString();
            //                    if (result == "Ok")
            //                    {

            //                    }
            //                    else return false;
            //                }
            //                else return false;
            //            }

            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
            //        return false;
            //    }
            //}
        }

        public async Task<List<ShopDTO>> LoadShopAsync(string userId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Shop_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var shops = ConvertToListFromDataTable<ShopDTO>(ds.Tables[0]).ToList();

                                return shops;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }

        //Shop
        public async Task<ShopDTO> GetShopAsync(string userId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Shop_Detail_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var shop = ConvertToListFromDataTable<ShopDTO>(ds.Tables[0]).FirstOrDefault();

                                return shop;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }

        public async Task<ShopDTO> GetShopDetailAsync(string userId, string merchantId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Shop_Detail_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", merchantId));
                        command.Parameters.Add(new SqlParameter("@CustomerId", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var shop = ConvertToListFromDataTable<ShopDTO>(ds.Tables[0]).FirstOrDefault();

                                return shop;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }

        //Profile
        public async Task<UserDTO> GetProfileAsync(string userId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Users_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@Id", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var user = ConvertToListFromDataTable<UserDTO>(ds.Tables[0]).FirstOrDefault();
                                return user;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }
        public async Task<ShopModel> GetShopProfileAsync(string userId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_User_Profile_Get", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                var shop = ConvertToListFromDataTable<ShopModel>(ds.Tables[0]).FirstOrDefault();
                                return shop;
                            }
                            else return null;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return null;
                }
            }
        }

        public async Task<bool> UpdateProfileAsync(IJSRuntime jSRuntime, UserDTO user, ShopModel shop)
        {
            bool updateUser = await UpdateUserAsync(user);
            if (updateUser)
            {
                bool updateShop = await UpdateShopAsync(shop, user.Id);
                if (updateShop)
                {
                    return true;
                }
                else await jSRuntime.InvokeVoidAsync("AnnountMessage", 2, "Lỗi hệ thống");
            }
            else await jSRuntime.InvokeVoidAsync("AnnountMessage", 2, "Lỗi hệ thống");
            return false;
        }

        public async Task<int> SaveFileAsync(IJSRuntime jSRuntime, IFormFile file, string fileSize, string fileType, string fileName, string baseUri, string fileDuration, string thumbnail)
        {
            using HttpClient _httpClient = new HttpClient();
            using var content = new MultipartFormDataContent();
            await using var stream = file.OpenReadStream();
            content.Add(new StreamContent(stream), "myFile", fileName);
            content.Add(new StringContent(fileSize), "FileSize");
            content.Add(new StringContent(fileType), "FileType");
            content.Add(new StringContent(fileDuration), "FileDuration");
            content.Add(new StringContent(thumbnail), "ThumbnailData");
            content.Add(new StringContent(fileName), "FileName");
            try
            {
                using var response = await _httpClient.PostAsync((baseUri + "api/upload/upload"), content);
                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    var ds = JsonConvert.DeserializeObject<DataSet>(responseData);
                    var fileID = Convert.ToInt32(ds.Tables[0].Rows[0]["FileID"].ToString());
                    return fileID;
                }
                return 0;

            }
            catch (Exception ex)
            {
                await jSRuntime.InvokeVoidAsync("AnnountMessage", 2, ex.Message.ToString());
                return 0;
            }
        }

        private async Task<bool> UpdateUserAsync(UserDTO user)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Users_Save", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@Id", user.Id));
                        command.Parameters.Add(new SqlParameter("@Name", user.Name));
                        command.Parameters.Add(new SqlParameter("@Phone", user.Phone));
                        command.Parameters.Add(new SqlParameter("@Address", user.Address));
                        command.Parameters.Add(new SqlParameter("@Gender", user.Gender));
                        command.Parameters.Add(new SqlParameter("@AccountNumber", user.AccountNumber));
                        command.Parameters.Add(new SqlParameter("@BankName", user.BankName));
                        command.Parameters.Add(new SqlParameter("@AccountOwner", user.AccountOwner));
                        command.Parameters.Add(new SqlParameter("@Dob", user.Dob));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                if (ds != null)
                                {
                                    DataRow firstRow = ds.Tables[0].Rows[0];
                                    var result = firstRow["Result"].ToString();

                                    return result == "Ok" ? true : false;
                                }
                                else return false;
                            }
                            else return false;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return false;
                }
            }
        }
        private async Task<bool> UpdateShopAsync(ShopModel shop, string shopId)
        {
            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Shop_Save", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@Id", shopId));
                        command.Parameters.Add(new SqlParameter("@ClinicName", shop.ClinicName));
                        command.Parameters.Add(new SqlParameter("@TaxCode", shop.TaxCode));
                        command.Parameters.Add(new SqlParameter("@Description", shop.Description));
                        command.Parameters.Add(new SqlParameter("@LogoId", shop.LogoId));
                        command.Parameters.Add(new SqlParameter("@OwnerName", shop.OwnerName));
                        command.Parameters.Add(new SqlParameter("@CitizenIdentityNumber", shop.CitizenIdentityNumber));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                if (ds != null)
                                {
                                    DataRow firstRow = ds.Tables[0].Rows[0];
                                    var result = firstRow["Result"].ToString();

                                    return result == "Ok" ? true : false;
                                }
                                else return false;
                            }
                            else return false;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return false;
                }
            }
        }

        public async Task<bool> FoloShopAsync(string userId, string merchantId)
        {

            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Follow_Save", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));
                        command.Parameters.Add(new SqlParameter("@MerchantId", merchantId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                DataRow firstRow = ds.Tables[0].Rows[0];
                                var result = firstRow["Result"].ToString();
                                return result == "Ok" ? true : false;
                            }
                            else return false;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return false;
                }
            }
        }

        public async Task<bool> UnFoloShopAsync(string userId, string merchantId)
        {

            using (SqlConnection connection = new SqlConnection(StringConnection))
            {
                try
                {
                    connection.Open();
                    var product = new ProductDetailViewMode();
                    using (SqlCommand command = new SqlCommand("ws_Follow_Delete", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@UserId", userId));
                        command.Parameters.Add(new SqlParameter("@MerchantId", merchantId));

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            DataSet ds = new DataSet();
                            adapter.Fill(ds);

                            if (ds != null)
                            {
                                DataRow firstRow = ds.Tables[0].Rows[0];
                                var result = firstRow["Result"].ToString();
                                return result == "Ok" ? true : false;
                            }
                            else return false;
                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Có lỗi xảy ra: " + ex.Message);
                    return false;
                }
            }
        }

        public List<T> ConvertToListFromDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                    {
                        if (dr[column.ColumnName].GetType() == typeof(System.Guid))
                        {
                            pro.SetValue(obj, dr[column.ColumnName].ToString(), null);
                        }
                        else if (dr[column.ColumnName].GetType() == typeof(System.DBNull))
                        {
                            pro.SetValue(obj, null, null);
                        }
                        else if (dr[column.ColumnName].GetType() == typeof(System.Decimal))
                        {
                            pro.SetValue(obj, ConvertSafe.ToDouble(dr[column.ColumnName]), null);
                        }
                        else if (dr[column.ColumnName].GetType() == typeof(System.Boolean))
                        {
                            pro.SetValue(obj, ConvertSafe.ToBoolean(dr[column.ColumnName]), null);
                        }
                        else if (dr[column.ColumnName].GetType() == typeof(System.Int64) || dr[column.ColumnName].GetType() == typeof(System.Int32))
                        {
                            pro.SetValue(obj, ConvertSafe.ToInt32(dr[column.ColumnName]), null);
                        }
                        else
                        {
                            pro.SetValue(obj, dr[column.ColumnName], null);
                        }
                    }
                    else
                        continue;
                }
            }
            return obj;
        }
    }
}
