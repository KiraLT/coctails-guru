import { Row, Col } from 'react-bootstrap'
import { RecipeWithMeta } from '../controllers/recipes'
import Image from "next-image-export-optimizer"
import Link from 'next/link'

export function Recipes({ recipes }: { recipes: RecipeWithMeta[] }): JSX.Element {
    return (
        <Row>
            {recipes.map((recipe) => (
                <Col key={recipe.meta.id} xs={12} sm={6} md={4}>
                    <div className="single-best-receipe-area mb-30">
                        <Link href={`/recipes/${recipe.meta.slug}`} legacyBehavior>
                            <a>
                                <div
                                    style={{
                                        position: 'relative',
                                        height: '300px',
                                    }}
                                >
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.data.name}
                                        fill={true}
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="receipe-content">
                                    <h5>{recipe.data.name}</h5>
                                </div>
                            </a>
                        </Link>
                    </div>
                </Col>
            ))}
        </Row>
    )
}
