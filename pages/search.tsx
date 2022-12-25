import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Alert } from 'react-bootstrap'
import Fuse from 'fuse.js'

import { Layout } from '../components/layout'
import { Recipe } from '../controllers/recipes'
import { Recipes } from '../components/recipes'

const Home: NextPage = () => {
  const router = useRouter()
  const { q } = router.query
  
  const query = typeof q === 'string' ? q : ''

  const fuse = useMemo(() => {
    return new Fuse(Recipe.getAll(), {
      keys: ['name']
    })
  }, [])

  const recipes = useMemo(() => {
    return fuse.search(query).map(v => v.item)
  }, [fuse, query])

  return (
    <Layout title="Search">
      <section className="best-receipe-area">
          <div className="container">
              <div className="row">
                  <div className="col-12">
                      <div className="section-heading">
                          <h3>Search for: {q}</h3>
                      </div>
                  </div>
              </div>
              {!recipes.length && <Alert variant="info">No results were found</Alert>}
              {!!recipes.length && <Recipes recipes={recipes} />}
          </div>
      </section>
    </Layout>
  )
}

export default Home