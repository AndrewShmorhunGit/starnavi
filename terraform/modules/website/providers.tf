# Defining the provider for us-east-1
provider "aws" {
  alias  = "us_east_1"  # Using an alias for the us-east-1 region
  region = "us-east-1"
}

# Defining the provider for the default region
provider "aws" {
  region = var.aws_region  # Default region, e.g., eu-central-1
}
