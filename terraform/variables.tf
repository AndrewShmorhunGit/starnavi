variable "aws_region" {
  description = "The AWS region where resources will be deployed."
  type        = string
  default     = "eu-central-1"
}

variable "s3_bucket_website" {
  description = "The S3 bucket for hosting the main website."
  type        = string
}

variable "s3_bucket_redirect" {
  description = "The S3 bucket for handling redirects to the main website."
  type        = string
}

variable "cloudfront_default_root" {
  description = "The default root object for CloudFront."
  type        = string
  default     = "index.html"
}

variable "tags_env" {
  description = "Tag to specify the environment (e.g., dev, prod)."
  type        = string
  default     = "prod"
}

variable "route53_zone_id" {
  description = "The ID of the Route 53 hosted zone for the domain."
  type        = string
}