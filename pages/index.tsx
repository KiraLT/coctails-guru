import type { NextPage } from 'next'
import { useMemo } from 'react'

import { Layout } from '../components/layout'
import { Recipes } from '../components/recipes'
import { getAllRecipesWithMeta } from '../controllers/recipes'

const Home: NextPage = () => {
    const recipes = useMemo(() => getAllRecipesWithMeta(), [])

    return (
        <Layout title="Signature Cocktails">
            <section className="best-receipe-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h3>Signature Cocktails</h3>
                            </div>
                        </div>
                    </div>
                    {!!recipes.length && <Recipes recipes={recipes} />}
                </div>
            </section>
        </Layout>
    )
}

export default Home
