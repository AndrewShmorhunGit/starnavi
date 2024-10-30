# Создаем сертификат
resource "aws_acm_certificate" "domain_certificate" {
  provider          = aws.us_east_1
  domain_name       = var.s3_bucket_website
  validation_method = "DNS"

  subject_alternative_names = [
    var.s3_bucket_redirect
  ]

  tags = {
    Name        = "${var.s3_bucket_website} SSL Certificate"
    Environment = var.tags_env
  }
}


# Валидируем сертификат
resource "aws_acm_certificate_validation" "domain_validation" {
  provider              = aws.us_east_1
  certificate_arn      = aws_acm_certificate.domain_certificate.arn
  validation_record_fqdns = [for option in aws_acm_certificate.domain_certificate.domain_validation_options : option.resource_record_name]

  depends_on = [aws_route53_record.domain_validation]
}
