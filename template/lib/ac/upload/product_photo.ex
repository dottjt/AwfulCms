defmodule Ac.Upload.ProductPhoto do
  use Arc.Definition

  alias Ac.Upload.ProductPhoto
  # Include ecto support (requires package arc_ecto installed):
  # use Arc.Ecto.Definition

  @versions [:original, :thumb]
  @acl :public_read  


  def transform(:thumb, _) do
    {:convert, "-strip -thumbnail 300x250^ -gravity center -extent 300x250"}
  end


  def upload_product_photo_manual(file) do
    # Get the file's extension
    IO.inspect "1"
    IO.inspect file
    file_extension = Path.extname(file.filename)
  
    IO.inspect "2"
    
    # Generate the UUID
    file_uuid = UUID.uuid4(:hex)
  
    # Set the S3 filename
    s3_filename = "#{file_uuid}.#{file_extension}"
  
    # The S3 bucket to upload to
    s3_bucket = "awfulchristmas.com"
  
    # Load the file into memory
    {:ok, file_binary} = File.read(file.path)
  
    # Upload the file to S3
    {:ok, _} = 
      ExAws.S3.put_object(s3_bucket, s3_filename, file_binary)
      |> ExAws.request()

    # value returned
    s3_filename  

    IO.inspect s3_filename
  end


  #  WHEN USING EXTERNAL URL AND ALSO 
  def upload_product_photo_store(file_url) do
    IO.inspect file_url
    
    case ProductPhoto.store(file_url) do
      {:ok, file_name} ->
        IO.inspect ProductPhoto.url(file_name)
        ProductPhoto.url(file_name)

      {:error, error} ->
        IO.inspect "your file upload didn't go as planned"
        IO.inspect error
    end
  end

  # To add a thumbnail version:
  # @versions [:original, :thumb]

  # Whitelist file extensions:
  # def validate({file, _}) do
  #   ~w(.jpg .jpeg .gif .png) |> Enum.member?(Path.extname(file.file_name))
  # end

  # Define a thumbnail transformation:
  # def transform(:thumb, _) do
  #   {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -format png", :png}
  # end

  # Override the persisted filenames:
  # def filename(version, _) do
  #   version
  # end

  # Override the storage directory:
  # def storage_dir(version, {file, scope}) do
  #   "uploads/user/avatars/#{scope.id}"
  # end

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  # def s3_object_headers(version, {file, scope}) do
  #   [content_type: Plug.MIME.path(file.file_name)]
  # end

end
