module "website" {
  source = "./modules/website"

  aws_region           = var.aws_region
  s3_bucket_website    = var.s3_bucket_website
  s3_bucket_redirect    = var.s3_bucket_redirect
  route53_zone_id      = var.route53_zone_id      
  ssl_certificate_arn  = var.ssl_certificate_arn  
  tags_env             = var.tags_env
}
