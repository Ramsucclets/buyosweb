# Custom Domain with HTTPS and CDN Setup

This guide will walk you through setting up your custom domain **buyos.store** with HTTPS and CloudFront CDN for your Elastic Beanstalk application.

## Architecture Overview

```
User Request (buyos.store)
        ↓
    Route 53 DNS
        ↓
  CloudFront CDN (HTTPS)
        ↓
 Elastic Beanstalk
        ↓
   Your Application
```

**Benefits**:

- 🔒 **HTTPS**: Secure, encrypted connections
- ⚡ **CDN**: Global edge locations = faster loading
- 🌍 **Global**: CloudFront caches content worldwide
- 💰 **Cost**: Often cheaper than direct EB traffic

## Prerequisites

Before starting, ensure you have:

- ✅ Domain registered: `buyos.store`
- ✅ Elastic Beanstalk environment running
- ✅ Access to AWS Console
- ✅ Access to your domain registrar (to update DNS)

## Part 1: Request SSL/TLS Certificate

### Step 1.1: Go to AWS Certificate Manager

1. Log in to AWS Console
2. **Important**: Switch region to **US East (N. Virginia) us-east-1**
   - CloudFront requires certificates in `us-east-1` region
   - Use the region dropdown in top-right corner
3. Search for **"Certificate Manager"** or **"ACM"**
4. Click on **"Certificate Manager"**

### Step 1.2: Request a Public Certificate

1. Click **"Request a certificate"**
2. Select **"Request a public certificate"**
3. Click **"Next"**

### Step 1.3: Configure Domain Names

1. **Fully qualified domain names**:

   - Add: `buyos.store` (apex domain)
   - Click **"Add another name to this certificate"**
   - Add: `www.buyos.store` (www subdomain)
   - Add: `*.buyos.store` (wildcard for all subdomains - optional but recommended)

2. **Validation method**:

   - Select **"DNS validation"** (recommended)
   - This is easier and auto-renews

3. **Key algorithm**:

   - Leave as **RSA 2048** (default)

4. **Tags** (optional):

   - Key: `Name`, Value: `buyos.store SSL Certificate`

5. Click **"Request"**

### Step 1.4: Validate Domain Ownership

After requesting, you'll see a **"Pending validation"** status.

1. Click on the certificate ID to view details
2. You'll see DNS records you need to add:

```
Name: _abc123...buyos.store
Type: CNAME
Value: _xyz789...acm-validations.aws
```

3. **Add DNS Records** (choose your method):

#### Option A: If using Route 53

1. Click **"Create records in Route 53"** button
2. AWS will automatically add the validation records
3. Click **"Create records"**
4. Wait 5-10 minutes for validation

#### Option B: If using another registrar (GoDaddy, Namecheap, etc.)

1. Copy the **CNAME name** and **CNAME value**
2. Log in to your domain registrar
3. Go to DNS management
4. Add a new **CNAME** record with the name and value
5. Wait 10-30 minutes for DNS propagation
6. Return to ACM - certificate should show **"Issued"** status

> [!NOTE]
> Validation can take anywhere from 5 minutes to 30 minutes. The certificate will auto-renew as long as the DNS record remains.

---

## Part 2: Set Up CloudFront CDN

### Step 2.1: Create CloudFront Distribution

1. Go to **CloudFront** service in AWS Console
2. Click **"Create distribution"**

### Step 2.2: Origin Settings

**Origin domain**:

- **DO NOT** select from dropdown
- Manually enter your Elastic Beanstalk URL
- Format: `your-env-name.region.elasticbeanstalk.com`
- Example: `buyosweb-prod.us-east-1.elasticbeanstalk.com`

**Protocol**:

- Select **"HTTP only"** (EB will be behind CloudFront)

**HTTP port**: `80`

**Name**: `EB-buyosweb` (or any name you prefer)

**Add custom header** (optional but recommended):

- Header name: `X-Custom-Header`
- Value: `secret-value-12345`
- This allows EB to verify traffic is from CloudFront

**Enable Origin Shield**: No (unless you need it)

### Step 2.3: Default Cache Behavior Settings

**Viewer protocol policy**:

- Select **"Redirect HTTP to HTTPS"**
- This forces all traffic to use HTTPS

**Allowed HTTP methods**:

- Select **"GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE"**
- Needed for API routes

**Cache policy**:

- Select **"CachingOptimized"**
- Or create custom policy (see below)

**Origin request policy**:

- Select **"AllViewer"**
- This forwards headers, query strings, cookies

**Response headers policy** (optional):

- Select **"SimpleCORS"** if you need CORS
- Or leave as "No response headers policy"

### Step 2.4: Function Associations (Optional)

Skip for now - can add later for advanced features

### Step 2.5: Web Application Firewall (WAF)

**Enable security protections**:

- Select **"Do not enable security protections"** (free tier)
- Or enable WAF for DDoS protection (additional cost)

### Step 2.6: Settings

**Alternate domain names (CNAMEs)**:

- Click **"Add item"**
- Add: `buyos.store`
- Click **"Add item"** again
- Add: `www.buyos.store`

**Custom SSL certificate**:

- Click the dropdown
- Select the certificate you created in Part 1
- Should show: `buyos.store (certificate-id)`

**Supported HTTP versions**:

- Check **HTTP/2** and **HTTP/3** (for better performance)

**Default root object**:

- Leave blank (our Express server handles this)

**Standard logging**: Off (to save costs - enable if you need logs)

**IPv6**: On (recommended)

**Description**: `CDN for buyos.store`

### Step 2.7: Create Distribution

1. Click **"Create distribution"**
2. Distribution will be created (status: "Deploying")
3. **Wait 10-20 minutes** for deployment to complete
4. Note the **Distribution domain name**: `d123abc.cloudfront.net`

---

## Part 3: Configure DNS (Point Domain to CloudFront)

Once CloudFront deployment is complete (status: "Enabled"):

### Step 3.1: Get CloudFront Domain Name

1. Go to CloudFront distributions
2. Find your distribution
3. Copy the **Distribution domain name** (e.g., `d123abc.cloudfront.net`)

### Step 3.2: Update DNS Records

Choose your DNS provider:

#### Option A: Using Route 53 (Recommended)

**For Apex Domain (buyos.store)**:

1. Go to **Route 53** in AWS Console
2. Click **"Hosted zones"**
3. Click on **buyos.store**
4. Click **"Create record"**
5. Configuration:
   - Record name: (leave blank for apex)
   - Record type: **A - Routes traffic to IPv4 address**
   - **Toggle "Alias" switch to ON**
   - Route traffic to: **Alias to CloudFront distribution**
   - Choose distribution: Select your CloudFront distribution
   - Click **"Create records"**

**For WWW Subdomain (www.buyos.store)**:

1. Click **"Create record"**
2. Configuration:
   - Record name: `www`
   - Record type: **A - Routes traffic to IPv4 address**
   - **Toggle "Alias" switch to ON**
   - Route traffic to: **Alias to CloudFront distribution**
   - Choose distribution: Select your CloudFront distribution
   - Click **"Create records"**

#### Option B: Using Another Registrar (GoDaddy, Namecheap, etc.)

**For Apex Domain (buyos.store)**:

- Type: **CNAME** (or ALIAS/ANAME if supported)
- Name: `@` or leave blank
- Value: Your CloudFront domain (e.g., `d123abc.cloudfront.net`)
- TTL: 300 (5 minutes) or automatic

**For WWW Subdomain (www.buyos.store)**:

- Type: **CNAME**
- Name: `www`
- Value: Your CloudFront domain (e.g., `d123abc.cloudfront.net`)
- TTL: 300 (5 minutes) or automatic

> [!WARNING]
> Some registrars don't support CNAME for apex domains. In that case:
>
> - Transfer DNS to Route 53 (recommended), OR
> - Use A records with CloudFront IP addresses (not recommended - IPs can change)

### Step 3.3: Wait for DNS Propagation

- DNS changes can take **10 minutes to 48 hours** to propagate globally
- Usually takes 10-30 minutes
- Check status: Use [DNS Checker](https://dnschecker.org/)

---

## Part 4: Verification and Testing

### Step 4.1: Test Your Domain

After DNS propagates, test your domain:

1. **HTTP Redirect Test**:

   - Visit: `http://buyos.store`
   - Should redirect to: `https://buyos.store`

2. **HTTPS Test**:

   - Visit: `https://buyos.store`
   - Should show lock icon in browser
   - Click lock → Certificate should show as valid

3. **WWW Test**:

   - Visit: `https://www.buyos.store`
   - Should work and show HTTPS

4. **API Test**:
   - Visit: `https://buyos.store/api/health`
   - Should return: `{"status":"ok","message":"Server is running"}`

### Step 4.2: Test CloudFront Caching

1. Open browser DevTools (F12)
2. Go to Network tab
3. Visit `https://buyos.store`
4. Click on a static file (image, CSS, JS)
5. Check response headers for:
   - `X-Cache: Hit from cloudfront` (if cached)
   - `X-Cache: Miss from cloudfront` (first request)

Refresh the page - should see "Hit from cloudfront" for static files

### Step 4.3: Test Global Performance

Use these tools to test CDN performance:

- [GTmetrix](https://gtmetrix.com/) - Check loading speed
- [WebPageTest](https://www.webpagetest.org/) - Test from different locations
- [Pingdom](https://tools.pingdom.com/) - Performance monitoring

---

## Part 5: Optimize CloudFront Caching (Optional)

### Create Custom Cache Policy

For better performance, create a custom cache policy:

1. Go to CloudFront → **Policies** → **Cache**
2. Click **"Create cache policy"**
3. Configuration:
   - Name: `buyos-cache-policy`
   - **TTL settings**:
     - Minimum TTL: `1` second
     - Maximum TTL: `31536000` (1 year)
     - Default TTL: `86400` (1 day)
   - **Cache key settings**:
     - Headers: Include "None" (or specific headers if needed)
     - Query strings: Include "All" (for dynamic content)
     - Cookies: Include "None" (or specific cookies if needed)
4. Click **"Create"**

### Update Distribution

1. Go to your CloudFront distribution
2. Go to **Behaviors** tab
3. Select default behavior → Click **"Edit"**
4. Under **Cache policy**, select your new policy
5. Click **"Save changes"**
6. Wait for deployment

---

## Part 6: Additional Optimizations

### Enable Gzip/Brotli Compression

CloudFront automatically compresses responses if:

1. Go to your distribution
2. **Behaviors** → Edit default behavior
3. **Compress objects automatically**: **Yes**
4. Save changes

### Set Up WWW Redirect (Optional)

If you want `buyos.store` to redirect to `www.buyos.store` (or vice versa):

1. This requires CloudFront Functions or Lambda@Edge
2. Or handle in your Express server:

```javascript
// In server/index.js, before other routes:
app.use((req, res, next) => {
  const host = req.headers.host;
  if (host === "buyos.store") {
    return res.redirect(301, `https://www.buyos.store${req.url}`);
  }
  next();
});
```

### Invalidate Cache (Clear CDN Cache)

When you deploy updates:

1. Go to CloudFront distributions
2. Select your distribution
3. Go to **Invalidations** tab
4. Click **"Create invalidation"**
5. Object paths: `/*` (invalidates everything)
6. Click **"Create invalidation"**
7. Wait 5-10 minutes

> [!NOTE]
> Invalidations are free for the first 1,000 paths per month

---

## Cost Breakdown

Estimated costs for CloudFront + EB:

| Service                       | Cost (approx.)                     |
| ----------------------------- | ---------------------------------- |
| CloudFront (first 10TB/month) | $0.085/GB                          |
| CloudFront (HTTPS requests)   | $0.0075/10,000 requests            |
| ACM Certificate               | **Free**                           |
| Route 53 Hosted Zone          | $0.50/month                        |
| Elastic Beanstalk             | $10-50/month (depends on instance) |

**Example**: 100GB transfer + 1M requests = ~$9-10/month for CloudFront

---

## Troubleshooting

### "Certificate not found" in CloudFront

**Cause**: Certificate not in `us-east-1` region

**Solution**: Request certificate again in `us-east-1`

### "SSL handshake failed"

**Cause**: DNS not pointing to CloudFront yet

**Solution**: Wait for DNS propagation (check with `nslookup buyos.store`)

### "502 Bad Gateway" from CloudFront

**Cause**: CloudFront can't reach Elastic Beanstalk

**Solution**:

1. Check EB environment is running
2. Verify origin domain is correct
3. Check EB security group allows HTTP from CloudFront

### Page loads but no HTTPS

**Cause**: DNS pointing directly to EB instead of CloudFront

**Solution**: Update DNS to point to CloudFront distribution

### Cache not updating after deployment

**Cause**: CloudFront serving cached version

**Solution**: Create invalidation for `/*`

---

## Summary Checklist

- [x] Request SSL certificate in ACM (us-east-1)
- [x] Validate domain with DNS records
- [x] Create CloudFront distribution
- [x] Point origin to Elastic Beanstalk
- [x] Add custom domain (CNAMEs)
- [x] Attach SSL certificate
- [x] Update DNS to point to CloudFront
- [x] Wait for DNS propagation
- [x] Test HTTPS on buyos.store
- [x] Test HTTPS on www.buyos.store
- [x] Verify CDN caching works
- [x] Create cache invalidation after deployments

---

**Congratulations! Your site is now accessible at `https://buyos.store` with global CDN! 🎉**

Remember to invalidate CloudFront cache after each deployment for users to see updates immediately.
