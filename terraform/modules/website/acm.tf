# Requesting an SSL certificate for the primary domain and the redirect domain.
# Both domains will be included in the certificate using the 'subject_alternative_names' property.
# The validation method is DNS, meaning a DNS record will be created to verify ownership for both domains.
resource "aws_acm_certificate" "starnavi_certificate" {
  provider          = aws.us_east_1  # Use the us-east-1 provider for CloudFront certificates
  domain_name       = var.s3_bucket_website  # Primary domain to request the certificate for (www.starnavi.shmorhun.com)
  validation_method = "DNS"               # DNS validation for domain ownership
  
  # Additional domains to include in the certificate, such as the redirect domain
  subject_alternative_names = [
    var.s3_bucket_redirect  # Alternative domain (starnavi.shmorhun.com) for redirection
  ]

  tags = {
    Name        = "Starnavi SSL Certificate"
    Environment = var.tags_env  # Environment tag (e.g., prod, dev)
  }
}

# Validating the SSL certificate for both the primary and alternative domains using Route 53 DNS records.
# The `validation_record_fqdns` are the fully qualified domain names (FQDNs) for the DNS validation records.
resource "aws_acm_certificate_validation" "starnavi_validation" {
  provider              = aws.us_east_1  # Use the us-east-1 provider for validation
  certificate_arn       = aws_acm_certificate.starnavi_certificate.arn  # ARN of the requested SSL certificate
  validation_record_fqdns = [for record in aws_route53_record.starnavi_validation : record.fqdn]  # DNS validation records
}
