resource "aws_s3_bucket" "starnavi" {
  bucket = var.s3_bucket_website

  tags = {
    Name        = "Website bucket"
    Environment = var.tags_env
  }
}

resource "aws_s3_bucket" "redirect" {
  bucket = var.s3_bucket_redirect

  tags = {
    Name        = "Redirect bucket"
    Environment = var.tags_env
  }
}

resource "aws_s3_bucket_policy" "starnavi_policy" {
  bucket = aws_s3_bucket.starnavi.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.starnavi.arn}/*"
      }
    ]
  })
}
