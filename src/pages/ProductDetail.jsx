import { useEffect, useState } from 'react'
import { ArrowLeft, ExternalLink, ShoppingCart, Star } from 'lucide-react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const { data } = await axios.get(`/api/products/${encodeURIComponent(id)}`)
        if (cancelled) return
        const loadedProduct = data.data
        setProduct(loadedProduct)
        const { data: related } = await axios.get('/api/products')
        if (!cancelled) {
          const ids = loadedProduct.relatedProductIds || []
          setRelatedProducts(related.data.filter(item => ids.includes(item.id)))
        }
      } catch {
        if (!cancelled) setProduct(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id])

  if (loading) return <div className="product-detail-page"><div className="empty-state"><p>Loading product details...</p></div></div>
  if (!product) return <div className="product-detail-page"><div className="empty-state"><h3>Product not found</h3><button className="btn btn-primary" onClick={() => navigate('/')}>Back to store</button></div></div>

  const images = product.images?.length ? product.images : [product.image].filter(Boolean)
  const resolveImage = image => image?.startsWith('./') ? image.slice(1) : image
  const reviews = product.reviewsEnabled && Array.isArray(product.reviews) ? product.reviews : []
  const averageRating = reviews.length ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1) : null

  return (
    <div className="product-detail-page animate-fade-in">
      <button className="btn btn-ghost product-back-button" onClick={() => navigate('/')}><ArrowLeft size={17} /> Back to store</button>

      <div className="product-detail-hero">
        <div className="product-gallery">
          <div className="product-detail-image-zoom">
            <img src={resolveImage(images[activeImage])} alt={product.name} />
          </div>
          <div className="product-thumbnails">
            {images.map((image, index) => (
              <button key={`${image}-${index}`} className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)}>
                <img src={resolveImage(image)} alt={`${product.name} view ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-summary">
          <span className="badge badge-green">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-tagline">{product.tagline}</p>
          <div className="product-detail-review-summary">
            {averageRating ? <><Star size={16} fill="currentColor" /> {averageRating} ({reviews.length} verified reviews)</> : 'No verified reviews yet'}
          </div>
          <div className="product-detail-price">₹{product.price.toLocaleString()} <del>₹{(product.originalPrice || product.price).toLocaleString()}</del></div>
          <p className="product-detail-description">{product.detailedDescription || product.description}</p>
          <div className="product-detail-facts">
            <div><strong>Active ingredient</strong><span>{product.activeIngredient || 'Not specified'}</span></div>
            <div><strong>Dosage</strong><span>{product.dosage || 'Not specified'}</span></div>
            <div><strong>Pack sizes</strong><span>{product.packSizes?.join(', ') || 'Not specified'}</span></div>
            <div><strong>Suitable crops</strong><span>{product.crops?.join(', ') || 'Not specified'}</span></div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => window.alert('Add this product to cart from the store catalog.') }><ShoppingCart size={18} /> Add to cart</button>
          <button className="btn btn-secondary" onClick={() => navigate(`/product/${product.id}/ingredients`)}>View ingredient profile</button>
        </div>
      </div>

      <div className="product-detail-content-grid">
        <section className="product-detail-section"><h2>How to use</h2><p>{product.howToUse || 'Usage instructions will be published by the administrator.'}</p></section>
        <section className="product-detail-section"><h2>When to use</h2><p>{product.whenToUse || 'Timing guidance will be published by the administrator.'}</p></section>
      </div>

      <section className="product-detail-section product-reviews-section">
        <div className="product-section-heading"><div><h2>Verified customer reviews</h2><p>Only submitted review records are shown here.</p></div><span className={`badge ${product.reviewsEnabled ? 'badge-green' : 'badge-gray'}`}>{product.reviewsEnabled ? 'Reviews enabled' : 'Reviews disabled'}</span></div>
        {reviews.length ? reviews.map(review => <article className="verified-review" key={review.id || `${review.author}-${review.createdAt}`}><div className="review-stars">{'★'.repeat(Number(review.rating || 0))}</div><strong>{review.author || 'Verified customer'}</strong><p>{review.comment}</p></article>) : <div className="empty-state compact"><p>No verified reviews yet.</p></div>}
      </section>

      {product.relatedBlogs?.length > 0 && <section className="product-detail-section"><h2>Related blogs</h2><div className="related-blog-list">{product.relatedBlogs.map(blog => <a key={`${blog.title}-${blog.url}`} href={blog.url} target="_blank" rel="noreferrer">{blog.title}<ExternalLink size={15} /></a>)}</div></section>}

      {relatedProducts.length > 0 && <section className="product-detail-section"><h2>Related products</h2><div className="related-product-grid">{relatedProducts.map(item => <button key={item.id} onClick={() => navigate(`/product/${item.id}`)}><img src={resolveImage(item.images?.[0] || item.image)} alt={item.name} /><strong>{item.name}</strong><span>₹{item.price.toLocaleString()}</span></button>)}</div></section>}
    </div>
  )
}
