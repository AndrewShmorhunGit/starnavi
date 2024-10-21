### STAGE 2

resource "aws_cloudfront_origin_access_identity" "starnavi_identity" {
  comment = "Identity for Starnavi CloudFront"
}

resource "aws_cloudfront_distribution" "starnavi_distribution" {
  origin {
    domain_name = aws_s3_bucket.starnavi.bucket_regional_domain_name
    origin_id   = "S3-Website"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.starnavi_identity.id
    }
  }

  origin {
    domain_name = aws_s3_bucket.redirect.bucket_regional_domain_name
    origin_id   = "S3-Redirect"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.starnavi_identity.id
    }
  }

  enabled             = true
  default_root_object = var.cloudfront_default_root

  default_cache_behavior {
    target_origin_id = "S3-Website"

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods       = ["GET", "HEAD", "OPTIONS"]
    cached_methods        = ["GET", "HEAD"]
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    max_ttl     = 31536000
    default_ttl = 86400
  }

  viewer_certificate {
    acm_certificate_arn = var.ssl_certificate_arn
    ssl_support_method  = "sni-only"
  }

  tags = {
    Name        = "Starnavi CloudFront Distribution"
    Environment = var.tags_env
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
