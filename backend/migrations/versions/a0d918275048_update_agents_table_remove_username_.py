"""Update agents table: remove username, department and role

Revision ID: a0d918275048
Revises: daf3a9296a84
Create Date: 2024-05-27 18:15:47.154964

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0d918275048'
down_revision = 'daf3a9296a84'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('agents', schema=None) as batch_op:
        batch_op.drop_index('ix_agents_username')
        batch_op.drop_column('role')
        batch_op.drop_column('username')
        batch_op.drop_column('department')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('agents', schema=None) as batch_op:
        batch_op.add_column(sa.Column('department', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('username', sa.VARCHAR(length=64), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('role', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.create_index('ix_agents_username', ['username'], unique=True)

    # ### end Alembic commands ###
