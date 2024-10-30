resource "aws_cloudfront_origin_access_identity" "s3_origin_access_identity" {
  comment = "Origin Access Identity for S3 bucket"
}

resource "aws_cloudfront_distribution" "website_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.website_main.bucket}.s3-website.${var.aws_region}.amazonaws.com"
    origin_id   = "S3OriginMain"

    custom_origin_config {
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
      http_port              = 80
      https_port             = 443
    }

  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
  target_origin_id       = "S3OriginMain"
  viewer_protocol_policy = "redirect-to-https"

  allowed_methods = [
    "GET",
    "HEAD",
    "OPTIONS",
    "PUT",
    "POST",
    "PATCH",
    "DELETE",
  ]

  cached_methods = ["GET", "HEAD"]

  # Add this block to forward headers, cookies, and query strings (if needed)
  forwarded_values {
    query_string = false
    cookies {
      forward = "none"
    }
  }
}

  # Указываем альтернативные домены (CNAME)
  aliases  = [var.s3_bucket_website]
  

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.domain_certificate.arn
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_distribution" "redirect_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.website_redirect.bucket}.s3-website.${var.aws_region}.amazonaws.com"
    origin_id   = "S3OriginRedirect"

    custom_origin_config {
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
      http_port              = 80
      https_port             = 443
    }

  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
  target_origin_id       = "S3OriginRedirect" # or "S3OriginRedirect" for the redirect distribution
  viewer_protocol_policy = "redirect-to-https"

  allowed_methods = [
    "GET",
    "HEAD",
    "OPTIONS",
    "PUT",
    "POST",
    "PATCH",
    "DELETE",
  ]

  cached_methods = ["GET", "HEAD"]

  # Add this block to forward headers, cookies, and query strings (if needed)
  forwarded_values {
    query_string = false
    cookies {
      forward = "none"
    }
  }
}

  # Указываем альтернативные домены (CNAME)
  aliases  = [var.s3_bucket_redirect]
  

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.domain_certificate.arn
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
