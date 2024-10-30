# S3 bucket for main website (without website configuration block)
resource "aws_s3_bucket" "website_main" {
  bucket = var.s3_bucket_website
  
  tags = {
    Name        = "${var.s3_bucket_website} Main Bucket"
    Environment = var.tags_env
  }
}

# Public access block for main bucket
resource "aws_s3_bucket_public_access_block" "website_main_public_access" {
  bucket = aws_s3_bucket.website_main.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls  = false
  restrict_public_buckets = false
}

# S3 bucket website configuration for main bucket
resource "aws_s3_bucket_website_configuration" "website_main_config" {
  bucket = aws_s3_bucket.website_main.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Policy for the main website bucket to allow public access
resource "aws_s3_bucket_policy" "website_main_policy" {
  bucket = aws_s3_bucket.website_main.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.website_main.arn}/*"
      }
    ]
  })
}

# S3 bucket for redirect (without website configuration block)
resource "aws_s3_bucket" "website_redirect" {
  bucket = var.s3_bucket_redirect

  tags = {
    Name        = "${var.s3_bucket_website} Redirect Bucket"
    Environment = var.tags_env
  }
}

# Public access block for redirect bucket
resource "aws_s3_bucket_public_access_block" "website_redirect_public_access" {
  bucket = aws_s3_bucket.website_redirect.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls  = false
  restrict_public_buckets = false
}

# S3 bucket website configuration for redirect bucket
resource "aws_s3_bucket_website_configuration" "website_redirect_config" {
  bucket = aws_s3_bucket.website_redirect.id

  redirect_all_requests_to {
    host_name = var.s3_bucket_website
    protocol = "https"
  }
}

# Policy for the redirect bucket to allow public access
resource "aws_s3_bucket_policy" "website_redirect_policy" {
  bucket = aws_s3_bucket.website_redirect.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.website_redirect.arn}/*"
      }
    ]
  })
}


